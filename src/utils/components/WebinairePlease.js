import React from 'react';




function WebinairePlease(props){

    return(
        <div className="WebinairePlease">

              <div className="div1_WebinairePlease" >

                  <div  className="blue_div">
                      <span className="icon-logo-webinar icon1_webinaire"></span>
                  </div>

                  <div className="empty_div">
                      {props.children}
                  </div>

                  <div className="div_image">
                      <img src={props.logo} alt={""}/>
                    </div>

              </div>

        </div>
    )

}
export default WebinairePlease