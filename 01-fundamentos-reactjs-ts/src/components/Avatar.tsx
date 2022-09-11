import { ImgHTMLAttributes } from 'react';
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> { //O ImgHTMLAtributes contém todas as propriedades possíveis de uma tag img
    hasBorder?: boolean; //o Ponto de interrogação indica as propriedades que são opcionais
}

export function Avatar({hasBorder = true, ...props}: AvatarProps) { //Com o rest operator, ...props importa todas as proprieades possíveis de uma tag img
    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
            {...props} //Permite que todas as propriedades da img possam ser usadas
        />
    )
}