import React from 'react'

import { MatxProgressBar } from 'matx'
import { Card } from '@material-ui/core'

const MostViewed = () => {
  return (
    <div>
      <Card elevation={3} className='p-10'>
        <div className='card-title'>Most Viewed</div>
        <div class="scrolling-wrapper-grid">
          <div className='pt-8' />
          <div className="scroll">
            <div class="fig"> 
              <h2>1 </h2>
            </div>

            <Card className="p-5 kord">
              <div className="flix flex-middle">
                <div className="pics"> </div>      
                <div className="ml-12">
                  <small className="text-muted">
                      <h6> Knapsack Spray </h6>
                      <p>Category: Equipment</p>
                    </small>
                    <h6> #245,092 </h6>
                </div>
              </div>
            </Card>
          </div>

            <div className="py-4" />
            <div className="scroll">
              <div> 
                <h2>2 </h2>
              </div>
              <Card className=" kerd">
                <div className="flix flex-middle">
                  <div className="pics"> </div>      
                  <div className="ml-12">
                    <small className="text-muted">
                      <h6> Knapsack Spray </h6>
                      <p>Category: Equipment</p>
                    </small>
                    <h6> #245,092 </h6>
                 </div>
               </div>
              </Card>
            </div>

            <div className='py-4' />
            <div className="scroll">
              <div> 
                <h2>3 </h2>
              </div>
              <Card className="kerd">
                <div className="flix flex-middle">
                  <div className="pics"> </div>      
                  <div className="ml-12">
                    <small className="text-muted">
                      <h6> Knapsack Spray </h6>
                      <p>Category: Equipment</p>
                    </small>
                    <h6> #245,092 </h6>
                  </div>
                </div>
              </Card>
            </div>
           
            <div className='py-4' />
            <div className="scroll">
              <div> 
                <h2>4 </h2>
              </div>
              <Card className="kerd">
                <div className="flix flex-middle">
                  <div className="pics"> </div>      
                  <div className="ml-12">
                    <small className="text-muted">
                      <h6> Knapsack Spray </h6>
                      <p>Category: Equipment</p>
                   </small>
                   <h6> #245,092 </h6>
                 </div>
               </div>
              </Card>
            </div>
           
            <div className='py-4' />
            <div className="scroll">
              <div> 
                <h2>5</h2>
              </div>
              <Card className=" kerd">
                <div className="flix flex-middle">
                  <div className="pics"> </div>      
                  <div className="ml-12">
                    <small className="text-muted">
                      <h6> Knapsack Spray </h6>
                      <p>Category: Equipment</p>
                    </small>
                    <h6> #245,092 </h6>
                 </div>
               </div>
              </Card>
            </div>
           
          </div>
          </Card>
      </div>
    
  )
}

export default MostViewed
