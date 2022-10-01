import { Box, Typography } from "@mui/material";

export const Error = ({ text }) => (
    text === '' ? <></> :
        <Box alignContent='center' borderRadius={2} mt={4} bgcolor='#3a1111' p={2}>
            <Typography variant={'body2'} color={'error'} textAlign='center'>
                {text}
            </Typography>
        </Box>
);