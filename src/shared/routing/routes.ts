export namespace Route {
    export namespace Repository {
        export const detail = ({ owner, name }: { owner: string, name: string,  }) =>
            `/repositories/${owner}/${name}`;

        export const list = () => "/repositories/";
    }
}
