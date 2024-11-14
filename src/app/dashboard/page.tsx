import React from "react";
import Image from 'next/image';
import ProgressBar from "@/components/progressBar/page";


function getBudgetSpend(): number {
    return Math.floor(Math.random() * 101);
}

function getImageUrl(amount: number): string {
    const budgetAmount: number = 50

    if(amount > (budgetAmount - 10)) {
        return "/images/terriermon-disappointed.jpg"
    }

    if(amount > budgetAmount || amount === budgetAmount) {
        return "/images/terriermon-sad.jpg"
    }

    return "/images/terriermon-happy.jpg"
}

function getProgressBarColour(amount: number): string {
    const budgetAmount: number = 50

    if(amount > (budgetAmount - 10) || amount === budgetAmount) {
        return "orange"
    }

    if(amount > budgetAmount) {
        return "red"
    }

    return "green"
}

export default function Dashboard() {
    //todo remove this after getting current budget spend from api
    const test_spend= getBudgetSpend();
    const imageUrl = getImageUrl(test_spend);
    const progressBarColour = getProgressBarColour(test_spend);

    return (
        <>
        <div>Main Dashboard</div>
        <Image
            src={imageUrl}
            alt="Terriermon status according to amount spent"
            width={300}
            height={300}
        />
        <ProgressBar percentage={test_spend} colour={progressBarColour}/>
    </>
    )
}