
import { LayoutProps } from './../components/Layout/Layout';

export const isLayoutMobile = (layoutProps : LayoutProps) => {
    return layoutProps.width < 600;
} 