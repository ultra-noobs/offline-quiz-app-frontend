import "./frontPage.scss";
import * as content from  "../../contents/content.json"
import { Button } from 'semantic-ui-react'

const FrontPage = ()=>{
    return (
        <div className="frontPage">
            <div>
                <div>
                <p>{content.content[0].frontPage.TagLine1}</p>
                <p>{content.content[0].frontPage.TagLine2}</p>
                </div>
                <Button primary >Get started</Button>
            </div>
            <div>
                <img className="frontPageImg" src="images/offline.svg" alt="" />
            </div>
        </div>
    );
}
export default FrontPage;