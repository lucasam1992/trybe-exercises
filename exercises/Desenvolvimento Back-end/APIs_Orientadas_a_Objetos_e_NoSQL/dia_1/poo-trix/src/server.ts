import 'dotenv';
import app from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>console.log(`Rodando na porta ${PORT}`));
    }).catch((error) => {
        console.log('Connection with database generated and error:\r\n');
        console.log(error);
        console.log('\r\nServer initialization cancelled');
        process.exit(0);
    });