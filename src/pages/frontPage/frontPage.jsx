import "./frontPage.scss";
import * as content from  "../../contents/content.json"
const FrontPage = ()=>{
    return (
        <div className="frontPage">
            <div>
                <p>{content.content[0].frontPage.TagLine1}</p>
                <p>{content.content[0].frontPage.TagLine2}</p>
            </div>
            <div>
                <img className="frontPageImg" src="images/offline.svg" alt="" />
            </div>
        </div>
    );
}
export default FrontPage;