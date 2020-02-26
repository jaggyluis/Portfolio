import ReactGA from 'react-ga';

const trackingId = "UA-158998728-1"; // Google Analytics tracking ID
ReactGA.initialize(trackingId);

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