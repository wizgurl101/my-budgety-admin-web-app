import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from "@mui/material/Box";

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
            <Box>
                <CardContent sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography
                            gutterBottom variant="h6"
                            component="div"
                            sx={{
                                color: '#4A4947',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {name.toUpperCase()}
                        </Typography>
                        <Typography variant="body2"
                                    sx={{
                                        color: '#F7F7F7' ,
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                    }}>
                            $ {amount}
                        </Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    )
}