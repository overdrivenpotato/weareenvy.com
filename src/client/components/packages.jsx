import React from 'react'
import block from 'bem-cn'
import Donation from './donation'

const b = block('packages')

const options = [
    {
        name: 'Starter',
        description: 'Kickstart a tune',
        reach: '50k',
        price: '$5',
        link: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VZABGM4CDXSSC',
    },
    {
        name: 'Fresh',
        description: 'Reach new listeners',
        reach: '100k',
        price: '$10',
        link: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=62HA5A24SHHXE',
    },
    {
        name: 'Big league',
        description: 'Professional promo',
        reach: '250k',
        price: '$25',
        link: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AVXDCAMRQ7D9Q',
    },
    {
        name: 'Bomb',
        description: 'Explosively big',
        reach: '500k',
        price: '$50',
        link: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=62Y96H33CPEMJ',
    },
    {
        name: 'Envious Suite',
        description: 'What are you waiting for?',
        reach: '1mil',
        price: '$100',
        link: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SUMKRAN8NFVLL',
    },
]

const Packages = ({choice, choose}) => (
    <div className={b}>
        <div className={b('selector')}>
            {
                options.map(option => (
                    <div
                        onClick={() => choose(option.name)}
                        className={b('option', {selected: choice == option.name})}
                    >
                        <div className={b('name')}>{option.name}</div>
                        <div className={b('description')}>{option.description}</div>
                        <div className={b('value')}>
                            {option.reach}
                        </div>
                    </div>
                ))
            }
        </div>
        <Donation info={options.find(opt => opt.name == choice)} />
    </div>
)

export default Packages
