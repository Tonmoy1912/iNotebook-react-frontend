import './Loader.css'
const Loader = () => {
   return (
      <>
         <div class="background"></div>
         <div className="loader-container">
            <div className="wrapper">
               <div className="loader">
                  <div className="dot first"></div>
               </div>
               <div className="loader">
                  <div className="dot second"></div>
               </div>
               <div className="loader">
                  <div className="dot third"></div>
               </div>
               <div className="loader">
                  <div className="dot fourth"></div>
               </div>
               <div className="loader">
                  <div className="dot fifth"></div>
               </div>
               <div className="loader">
                  <div className="dot sixth"></div>
               </div>
            </div>
            <div className="text">
               Please wait
            </div>
         </div>
      </>
   )
}
export default Loader