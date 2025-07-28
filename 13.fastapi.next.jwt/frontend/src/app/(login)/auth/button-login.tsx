import ModeToggle from "@/components/ui/mode-toggle";



interface Props {
    children: React.ReactNode
}

function ButtonLogin({ children}: Props){
    return (
        <div className={"absolute top-5 right-5"}>
            <ModeToggle /> 
            
            { children }
            
        </div>
    )
}

export default ButtonLogin;