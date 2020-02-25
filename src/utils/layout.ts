
import { LayoutProps } from './../components/Layout/Layout';

export const isLayoutMobile = (layoutProps : LayoutProps) => {
    return layoutProps.width < 600;
} 

export const isLayoutTablet = (layoutProps : LayoutProps) => {
    return layoutProps.width < 1200;
}