import axios from 'axios'

const citizenCreate = async (nidData) => {
    const config = {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
  const response = await axios.post('/api/validateNid', nidData, config)

  return response.data
}

const contactService = {
    citizenCreate
}

export default contactService
