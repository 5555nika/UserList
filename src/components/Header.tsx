
export interface ITitle {
    title: string
}
export const Header = ({ title }: ITitle ) => {


    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}