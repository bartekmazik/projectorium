import { User } from '@/entities/User';
import { DataSource } from 'typeorm';


export class DatabaseDataSource {
    static dataSource: DataSource | undefined;

    static get() {
        if (this.dataSource) return this.dataSource;

        this.dataSource = new DataSource({
            type: "mongodb",
            url: "mongodb://localhost/projectorium",
            synchronize: true,
            logging: true,
            entities: [User],
            migrations: [],
            subscribers: []
        });
    }
}