import React from 'react'
import {Footer} from 'flowbite-react'
import Logo from '../common/Logo'

function FooterUser() {
    return (
        <Footer container={true}>
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    {/* <Footer.Brand
                        href="https://flowbite.com"
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Flowbite Logo"
                        name="Flowbite"
                    /> */}
                    <Logo size={1.5} />

                    <Footer.LinkGroup>
                        <Footer.Link href="#">
                            About
                        </Footer.Link>
                        <Footer.Link href="#">
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link href="#">
                            Licensing
                        </Footer.Link>
                        <Footer.Link href="#">
                            Contact
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright
                    href="/"
                    by="Theora Learning™"
                    year={new Date().getFullYear()}
                />
            </div>
        </Footer>
    )
}

export default React.memo(FooterUser)