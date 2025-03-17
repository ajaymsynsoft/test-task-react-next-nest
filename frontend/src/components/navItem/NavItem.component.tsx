import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { Collapse, List, ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { NavItemProps } from './NavItem.type'
import { makeStyle } from './NavItem.style'
import { useReduxSelector } from '@/hooks/redux.hook'

export default function NavItem(props: NavItemProps) {
  props = { ...props, size: props.size || 'small' }
  const { data, isChildren, onClick, size, ...restProps } = props
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const style = makeStyle(size, isChildren)
  const isActive = data.link ? router.pathname.startsWith(data.link) : data.children!.find((item) => router.pathname.startsWith(item.link!))

  useEffect(() => {
    if (isActive) setOpen(true)
  }, [router.isReady])

  return (
    <>
      <MenuItem
        {...restProps}
        sx={style.root}
        className={`${isChildren ? 'submenu-item' : 'menu-item'} ${isActive ? 'active' : ''}`}
        onClick={(event) => {
          if (data.children) setOpen(!open)
          if (!data.children && onClick) onClick(event)
        }}
        {...(data.link ? { component: Link, href: data.link } : {})}
      >
        {data.Icon && (
          <ListItemIcon sx={style.itemIcon}>
            <data.Icon className="icon-lg" />
          </ListItemIcon>
        )}
        <ListItemText primary={data.label} sx={style.itemText} />
        {data.children && (open ? <MdExpandLess /> : <MdExpandMore />)}
      </MenuItem>

      {/* Children */}
      {data.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={style.childrenList}>
            {data.children.map((item, index) => (
              <NavItem {...props} data={item as any} isChildren key={index} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
