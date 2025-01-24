import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export interface CategoryCardProps {
    id ?: number;
    name: string;
    amount: number;
    color?: string;
}

export default function CategoryCard({ name, amount, color }: CategoryCardProps)
    : React.ReactElement  {
    return (
        <Card sx={{
            width: '200px',
            height: '250px',
            backgroundColor: color,
        }}>
            <CardActionArea>
                <CardContent sx={{
                    width: '100%'
                }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                       $ {amount}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}