import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travel Planner API',
            version: '1.0.0',
            description: 'Travel planner API scehma and documentation',
        },

    }
    ,
    apis: ['./src/routes/*.ts', './src/models/*.ts'],


}

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number) {
    console.log(port)
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // app.listen(port, () => {
    //     console.log(`Server is running on port ${port}`);
    // });


    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

}

export default swaggerDocs;
