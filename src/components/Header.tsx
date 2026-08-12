
export interface ITitle {
    title: string
}
export const Header = ({ title }: ITitle ) => {


    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}