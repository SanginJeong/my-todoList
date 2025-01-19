import React from 'react'

const HomeComponent = ({children}) => {
  return (
    <div className='wrap'>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

HomeComponent.row = ({children}) => {
  return <div className="home-row">{children}</div>
}

HomeComponent.categoryTitle = ({children}) => {
  return <h2 className="category-title">{children}</h2>
}

HomeComponent.categoryArea = ({children, img}) => {
  return (
    <div className="category-area">
      <div className="img-area"><img src={img}/></div>
      <div className="introduce-area">
        <p className="introduce">{children}</p>
      </div>
    </div>
  )
}

export default HomeComponent