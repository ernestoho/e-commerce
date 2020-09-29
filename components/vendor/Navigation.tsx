import React, { useState } from "react";
import Link from "next/link";
import { Button, Icon } from "@chakra-ui/core";
import Cookies from "js-cookie";
import { useUser } from "../../Context/UserProvider";

export const Navigation = () => {
  const role = Cookies.get("role");
  const [isOpen, setIsOpen] = useState(false);
  const { User } = useUser();
  return (
    <>
      {role && role === "vendor" && (
        <div className={isOpen ? "vendor-menu open" : "vendor-menu"}>
          <header>
            <span>PartyStore</span>
            <button onClick={() => setIsOpen(!isOpen)}>
              <Icon name="arrow-right" />
            </button>
          </header>
          <ul>
            <li>
              <Link href="/vendor/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href={`/store/${User && User.business_name_slug}`}>
                <a>Store</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Orders</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Add New Product</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Account</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Button style={{ color: "white", background: "var(--deepblue)" }}>
                Logout
              </Button>
            </li>
          </ul>
          <button
            className="vendor-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Icon name="close" />
            ) : (
              <img src="/menu.svg" alt="menu svg" />
            )}
          </button>
          <style jsx>{`
            .vendor-menu {
              background: var(--softblue);
              width: 250px;
              height: 100vh;
              border-right: 0.6px solid var(--softgrey);
              margin-left: -250px;
              position: relative;
              position: fixed;
              z-index: 2;
              transition: 0.5s ease;
            }

            .vendor-menu.open {
              margin-left: 0px;
              transition: 0.5s ease;
            }

            .vendor-menu ul {
              display: flex;
              flex-direction: column;
            }

            .vendor-menu header {
              font-style: italic;
              font-size: 1.2rem;
              font-weight: bold;
              color: white;
              margin-bottom: 10px;
              margin-left: 0;
              border-bottom: 1px solid;
              padding: 10px 15px;
              background: var(--deepblue);
              display: flex;
              justify-content: space-between;
            }
            .vendor-menu ul li {
              margin: 10px 10px;
            }
            .vendor-menu-btn {
              position: absolute;
              top: 0;
              right: 0;
              margin-right: -35px;
            }
            @media only screen and (min-width: 700px) {
              .vendor-menu {
                margin-left: 0px;
                position: static;
              }
              .vendor-menu-btn {
                display: none;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
