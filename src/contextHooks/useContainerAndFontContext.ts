import { useContext } from "react";
import { ContainerAndFontContext } from "../contexts/ContainerAndFontContext";




const useContainerAndFontContext = () => {

    const context = useContext(ContainerAndFontContext);

    if (!context) {
        throw new Error("useContainerAndFontContext must be used within a ContainerAndFontContextProvider");
    }

    return context;
}


export default useContainerAndFontContext;