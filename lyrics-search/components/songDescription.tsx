import {createElement} from "react";
import {ChildrenType} from './songDetail'

interface SongDescriptionType {
  description: ChildrenType
}


const SongDescription = ({description}: SongDescriptionType) => {
  const {tag, children} = description

  const parseDescription: any = (children: ChildrenType[]) => {
    if (!!!children) return null
    return children.map(child => {
        debugger
        const childText = Array.isArray(child?.children) ?
          child?.children.map(ch => (typeof ch?.children === 'string') ? ch.children :
            parseDescription(ch.children)) :
          child?.children ??
          (typeof child === 'string') ? child : ''

        return createElement(child.tag ?? 'p', {}, childText)
      }
    )
  }
  return <div style={{width: '30rem', height: ' 20rem', color: '#f0f0f0', fontSize: '0.9rem', overflow: 'auto', textAlign:'justify'}}>
    {!!tag && children && Array.isArray(children) && parseDescription(children)}
  </div>
}
export default SongDescription
