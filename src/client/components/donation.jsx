import React from 'react'
import block from 'bem-cn'

const b = block('donation')

const Donation = ({info}) => (
    !info ?
        <div className={b({hidden: true})}></div> :
        <div className={b}>
            <a className={b('button')}
                target="_blank"
                href={info.link}>
                Donate {info.price}
            </a>
            <span className={b('message')}>
                Toss us a friendly donation and we'll guarantee a listen!
            </span>
        </div>
)

export default Donation
