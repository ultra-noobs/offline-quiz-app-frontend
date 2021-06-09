import "./frontPage.scss";
import * as content from  "../../contents/content.json"
import { Button } from 'semantic-ui-react'

const FrontPage = ()=>{
    return (
        <div className="frontpage">
            <div className="frontpage__tagline">
                <div className="frontpage__tagline__text">
                <h1>{content.content[0].frontPage.TagLine1}</h1>
                <p>{content.content[0].frontPage.TagLine2}</p>
                </div>
                <Button primary >Get started</Button>
            </div>
            <div className="frontpage__img">
                <img className="frontPageImg" src="images/offline.svg" alt="" />
            </div>
        </div>
    );
}
export default FrontPage;