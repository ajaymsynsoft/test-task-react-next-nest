import { Injectable, NotFoundException, UnauthorizedException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Sequelize, Op } from "sequelize";
import * as jwt from "jsonwebtoken";
import globalMsg from "src/globalMsg";
import { User } from "src/models/user.entity";
import { UserRoles } from "src/models/userRoles.entity";
import { RoleMst } from "src/models/roleMst.entity";
import { Store } from "src/models/store.entity";

@Injectable()
export class CommonService {
    constructor(private readonly configService: ConfigService) { }

    validateId(id: any): number {
        const parsedId = +id;
        if (isNaN(parsedId)) {
            throw new NotFoundException(`Invalid ID`);
        }
        return parsedId;
    }

    async getUserByToken(userId: number, roleId: number, isParams = false) {
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

        let data: any = JSON.parse(JSON.stringify(user));
        data.roleId = data?.userRoles[0]?.roleId;
        data.role = data?.userRoles?.role?.name;
        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.FETCH_DATA_SUCCESSFULLY,
            data: data,
        };
    }

    generateToken(userId: number | bigint, roleId: number, configService?: ConfigService) {
        const jwtSecret = configService.get<string>('common.jwt');
        const token = jwt.sign({ userId, roleId, }, jwtSecret,
            { expiresIn: configService.get<string>('common.jwtExpire') || "365d" }
        );
        return token;
    }

    async findEntitiesWithPaginationAndSearch(Model, paginationDto, searchOptions, modules = "", userId = null) {
        let { pageNo = 1, pageSize = 10, sortOrder = 'desc', searchVal, sortBy, storeId = null } = paginationDto;
        const offset = (pageNo - 1) * pageSize;
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
        let include: any = [];

        if (userId) {
            whereClause = {
                ...whereClause,
                userId: userId,
            }
        }

        if (modules == 'AllProductsModule' && storeId) {
            whereClause = {
                ...whereClause,
                storeId: storeId,
            }
            include.push({
                model: Store,
                attributes: ['name'],
            })
        }

        if (modules == 'AdminProductsModule' || modules == 'GetAllOrdersModule') {
            include.push({
                model: Store,
                attributes: ['name'],
            })
        }

        const rows = await Model.findAll({
            ...searchOptions,
            where: whereClause,
            offset,
            limit: +pageSize,
            order,
            include
        });

        let totalItems


        totalItems = await Model.count({ distinct: true, col: 'id', where: whereClause, ...searchOptions });

        let totalCount = 0

        totalCount = await Model.count({ distinct: true, col: 'id', where: whereClause });

        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.FETCH_DATA_SUCCESSFULLY,
            data: {
                list: rows,
                totalItems,
                currentPage: +pageNo,
                totalPages: Math.ceil(totalItems / pageSize),
                totalCount
            }

        };


    }

    async createEntity(ModelClass, createDto, message = globalMsg.common.CREATED_SUCCESSFULLY) {
        const newData = await ModelClass.create(createDto);
        await newData.save();
        return {
            statusCode: HttpStatus.OK,
            message: message,
            result: newData,
        };
    }

    async deleteEntity(entity, id: number, notFoundMessage: string) {
        const existingEntity = await entity.findByPk(id);
        if (!existingEntity) {
            throw new NotFoundException(notFoundMessage);
        }

        await existingEntity.update({ status: 'deleted' });

        return {
            statusCode: HttpStatus.OK,
            message: globalMsg.common.DELTED_SUCESSFULLY,
        };
    }

    async updateEntity(entity, id: number, updateDto: any, notFoundMessage: string) {
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
    }
}
