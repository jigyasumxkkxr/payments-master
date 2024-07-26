
import { useEffect, useState } from "react"
import { Balance } from "../components/balance"
import { NavDashboard } from "../components/nav-dashboard"
import { Users } from "../components/users"
import axios from "axios"


export const Dashboard = () => {
    const firstName = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    // Capitalize the first letter of the name
    const capitalizedFirstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1).toLowerCase();


    return (
        <div>
            <NavDashboard label={"Payment Master"} userName={capitalizedFirstName} />
            <Balance token={token} />
            <Users placeholder={"Search users..."} />
        </div>
    );
};