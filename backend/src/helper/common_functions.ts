import { BadRequestException, HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";
import globalMsg from "src/globalMsg";
import { User } from "src/models/user.entity";
import { UserRoles } from "src/models/userRoles.entity";
import { handleSequelizeError } from "./error-handler";
import { Op, Sequelize } from "sequelize";
import * as jwt from 'jsonwebtoken';
import { RoleMst } from "src/models/roleMst.entity";
import { ConfigService } from "@nestjs/config";

export const idValidationDto = (id) => {
    const parsedId = +id;
    if (isNaN(parsedId)) {
        throw new NotFoundException(`Invalid id`);
    }
    return parsedId;
}

export const getUserByToken = async (userId: number, roleId: number, isParams = false) => {

    const user: any = await User.findOne({

        where: { id: userId },
        include: [
            {
                model: UserRoles,
                where: { roleId: roleId },
                include: [
                    {
                        model: RoleMst,
                        attributes: ['name'],
                    },
                ], attributes: ['roleId'],
            },
        ],
        attributes: ['email', 'id', 'name']
    });

    if (!user) {
        throw new UnauthorizedException(globalMsg.errors.UNAUTHORIZED);
    }

    if (!isParams && user.profile.isProfileSetup) {
        throw new UnauthorizedException(globalMsg.errors.ALREADY_SUBSCRIBED);
    }

    let data: any = JSON.parse(JSON.stringify(user));
    data.roleId = data?.userRoles[0]?.roleId;
    data.role = data?.userRoles?.role?.name;
    return {
        statusCode: HttpStatus.OK,
        message: globalMsg.common.FETCH_DATA_SUCCESSFULLY,
        data: data,
    };
}

export const generateToken = (userId: number | bigint, roleId: number, configService?: ConfigService) => {
    const jwtSecret = configService.get<string>('common.jwt');
    const token = jwt.sign({ userId, roleId, }, jwtSecret,
        { expiresIn: configService.get<string>('common.jwtExpire') || "365d" }
    );
    return token;
}

export async function findEntitiesWithPaginationAndSearch(Model, paginationDto, searchOptions, modules, lawyerId = null, clientId = null) {
    try {
        let { page = 1, limit = 10, sortOrder = 'desc', searchVal, sortBy, searchByStatus } = paginationDto;
        const offset = (page - 1) * limit;
        let order

        searchVal = searchVal && searchVal.length === 0 ? undefined : searchVal;
        sortBy = sortBy && sortBy.length === 0 ? undefined : sortBy;
        sortOrder = sortOrder && sortOrder.length === 0 ? 'desc' : sortOrder;

        if (sortBy) {
            // order = [[literal(`JSON_EXTRACT(${sortBy}, '$.en')`), sortOrder]];
            order = [[sortBy, sortOrder]];

        } else {
            sortOrder = 'desc'
            order = [['createdAt', sortOrder]];
        }


        let whereClause: any = {};

        if (modules === 'lawyerClientsModule' || modules === 'AdminGetAllClientModule') {

            if (searchVal) {
                searchOptions.include[0].where = {
                    ...searchOptions.include[0].where,
                    [Op.or]: [
                        { fullName: { [Op.like]: `%${searchVal}%` } },
                        { email: { [Op.like]: `%${searchVal}%` } },
                    ]
                }
            }

            if (lawyerId) {
                whereClause = { ...whereClause, lawyerId: lawyerId }
            }
            if (searchByStatus && searchByStatus?.length > 2) {
                const statusArray = JSON.parse(searchByStatus);
                searchOptions.include[0].where = {
                    ...searchOptions.include[0].where,
                    [Op.and]: [
                        searchOptions.include[0].where || {},
                        {
                            [Op.or]: statusArray.map(status => ({ status: status }))
                        }
                    ]
                }
            }
        }

        if (modules === 'AdminGetAllLawyerModule') {

            if (searchVal) {
                whereClause = {
                    ...whereClause,
                    [Op.or]: [
                        { fullName: { [Op.like]: `%${searchVal}%` } },
                        { email: { [Op.like]: `%${searchVal}%` } },
                    ]
                };
            }

            if (searchByStatus && searchByStatus?.length > 2) {
                const statusArray = JSON.parse(searchByStatus);
                whereClause = {
                    ...whereClause,
                    [Op.and]: [
                        {
                            [Op.or]: statusArray.map(status => ({ status: status }))
                        }
                    ]
                }
            }
        }

        if (modules === 'clientDocumentsModule') {

            if (clientId && lawyerId) {
                whereClause = { ...whereClause, clientId: clientId, lawyerId: lawyerId }
            }

            if (sortBy === 'createdAt') {
                sortOrder = 'desc'
                order = [['createdAt', sortOrder]];
            }
        }

        if (modules === 'documentModule') {

            whereClause = { ...whereClause, clientId: clientId, status: { [Op.ne]: 'rejected' } }


            if (sortBy === 'createdAt') {
                sortOrder = 'desc'
                order = [['createdAt', sortOrder]];
            }
        }

        if (modules === 'ShippingRequestModule') {

            if (searchVal) {
                whereClause = {
                    ...whereClause,
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.col('documents->lawyer.fullName'),
                            { [Op.like]: `%${searchVal}%` }
                        ),
                        Sequelize.where(
                            Sequelize.col('documents->user.fullName'),
                            { [Op.like]: `%${searchVal}%` }
                        ),
                        Sequelize.where(
                            Sequelize.col('documents.name'),
                            { [Op.like]: `%${searchVal}%` }
                        )
                    ]
                };
            }

            if (searchByStatus) {
                whereClause = {
                    ...whereClause,
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.col('actionType.name'),
                            { [Op.like]: `%${searchByStatus}%` }
                        ),
                    ]
                }
            }

        }

        if (modules === 'TransactionModule') {
            if (clientId) {
                whereClause = { ...whereClause, userId: clientId }
            }
            if (sortBy === 'createdAt') {
                sortOrder = 'desc'
                order = [['createdAt', sortOrder]];
            }
        }

        const rows = await Model.findAll({
            ...searchOptions,
            where: whereClause,
            offset,
            limit: +limit,
            order,
        });

        let totalItems


        totalItems = await Model.count({ distinct: true, col: 'id', where: whereClause, ...searchOptions });

        let totalCount = 0

        if (modules === 'ShippingRequestModule') {
            totalCount = await Model.count({ distinct: true, col: 'id' });
        } else {
            totalCount = await Model.count({ distinct: true, col: 'id', where: whereClause });
        }

        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.FETCH_DATA_SUCCESSFULLY,
            data: {
                list: rows,
                totalItems,
                currentPage: +page,
                totalPages: Math.ceil(totalItems / limit),
                totalCount
            }

        };

    } catch (error) {
        handleSequelizeError(error)
    }
}

export const createEntity = async (ModelClass, createDto, message = globalMsg.common.CREATED_SUCCESSFULLY) => {
    try {
        const newData = await ModelClass.create(createDto);
        await newData.save();
        return {
            statusCode: HttpStatus.OK,
            message: message,
            result: newData,
        };
    } catch (error) {
        handleSequelizeError(error)
    }
};

/**
 * Deletes an entity from the database by its ID.
 * 
 * @param {Object} entity - The Sequelize model representing the entity.
 * @param {number} id - The ID of the entity to be deleted.
 * @param {string} notFoundMessage - The message to throw if the entity is not found.
 * @param {boolean} enableHooks - Flag indicating whether to enable Sequelize hooks.
 * @returns {Object} - An object containing the status code and message.
 */
export const deleteEntity = async (entity, id: number, notFoundMessage: string) => {
    try {
        const existingEntity = await entity.findByPk(id);
        if (!existingEntity) {
            throw new NotFoundException(notFoundMessage);
        }

        await existingEntity.update({ status: 'deleted' });

        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.DELTED_SUCESSFULLY,
        };
    } catch (error) {
        handleSequelizeError(error)
    }
}

/**
 * Updates an existing entity in the database.
 *
 * @date 15-10-2024
 * @param {Model} entity - The Sequelize model of the entity to be updated.
 * @param {number} id - The ID of the entity to be updated.
 * @param {Object} updateDto - The data transfer object containing the updated fields.
 * @param {string} notFoundMessage - The error message to be thrown if the entity is not found.
 * @returns {Object} - The updated entity data.
 * @throws {NotFoundException} - If the entity with the specified ID is not found.
 * @throws {Exception} - If any error occurs during the update process.
 */

export const updateEntity = async (entity, id: number, updateDto: any, notFoundMessage: string) => {
    try {
        const existingEntity = await entity.findByPk(id);
        if (!existingEntity) {
            throw new NotFoundException(notFoundMessage);
        }

        const updatedData = await existingEntity.update(updateDto);

        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.UPDATED_SUCCESSFULLY,
            result: updatedData,
        };
    } catch (error) {
        handleSequelizeError(error)
    }
}




