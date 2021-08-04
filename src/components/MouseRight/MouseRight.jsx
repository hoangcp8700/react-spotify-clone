import React from 'react'
import { ContextMenuTrigger, ContextMenu, ContextMenuItem, Submenu } from 'rctx-contextmenu';
import './MouseRight.scss'

const MouseRight = ({children, val, menus, ...props}) => {
    return (
        <>
            <ContextMenuTrigger
                {...props}
                id={`my-context-menu-${val.id}`}>
                {children}
            </ContextMenuTrigger>

            <ContextMenu
                className="mouseRight"
                id={`my-context-menu-${val.id}`}>
                {menus.map((menu,ind) => (
                    menu?.subMenu 
                    ? <Submenu title={menu.label} key={menu.label}>
                        {menu?.subMenu.length 
                        ? menu?.subMenu.map(sub => (
                            <ContextMenuItem 
                                key={sub.label} 
                                onClick={() => sub.handle({id: val.id, type: val.type})}>
                                {sub.label}
                            </ContextMenuItem>
                        ))
                        : val.artists.map(artist => (
                            <ContextMenuItem 
                                key={artist.id} 
                                onClick={() => menu.handle({id: artist.id, type: artist.type})}>
                                {artist.name}
                            </ContextMenuItem>
                        ))
                       
                        }
                    </Submenu>
                    :<ContextMenuItem 
                        key={menu.label}
                        onClick={() => {
                            if(val.type === "track") {
                                return menu.handle({id: val?.album?.id, trackID: val.id, type: val?.album?.type})
                            }
                            menu.handle({id: val.id, type: val.type})
                        }}>
                            {menu.icon}
                            {menu.label}
                    </ContextMenuItem>
                ))}
            </ContextMenu>
        </>
    )
}

export default MouseRight
