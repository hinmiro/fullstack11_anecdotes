import { useSelector } from 'react-redux'

const Notification = () => {
   const notification = useSelector((state) => state.notification)

   const style = {
      border: 'solid',
      borderColor: 'darkGreen',
      padding: 10,
      borderWidth: 2,
      backgroundColor: 'lightGreen',
      borderRadius: '5px',
   }

   if (!notification) return null

   return <div style={style}>{notification}</div>
}

export default Notification
