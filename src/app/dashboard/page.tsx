import React from "react";
import Image from 'next/image';


function getBudgetSpend(): number {
    return Math.floor(Math.random() * 101);
}

function getImageUrl(amount: number): string {
    const budgetAmount: number = 50

    if(amount > (budgetAmount - 10) || amount === budgetAmount) {
        return "/images/terriermon-disappointed.jpg"
    }

    if(amount > budgetAmount) {
        return "/images/terriermon-sad.jpg"
    }

    return "/images/terriermon-happy.jpg"
}

export default function Dashboard() {
    //todo remove this after getting current budget spend from api
    const test_spend= getBudgetSpend();
    const imageUrl = getImageUrl(test_spend);

    return (
        <>
        <div>Main Dashboard</div>
            <Image
                src={imageUrl}
                alt="Terriermon status according to amount spent"
                width={500}
                height={500}
            />
        </>
    )
}