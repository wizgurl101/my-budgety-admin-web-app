import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface CardProps {
    name: string;
    amount: number;
}

export default function CategoryCard({ name, amount }: CardProps): React.ReactElement  {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {amount}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}