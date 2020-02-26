import ReactGA from 'react-ga';

export const send = (page) => {
    try {
    
        const pathName = '/' + page + '.html';
        
        console.log(pathName);

        ReactGA.set({ page: pathName }); // Update the user's current page
        ReactGA.pageview(pathName); // Record a pageview for the given page
    
    } catch (e) {

        console.warn(e);
    }
}