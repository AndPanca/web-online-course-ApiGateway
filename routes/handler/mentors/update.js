const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY EDIT MENTOR
module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    // Edit data ke url service-course/api/mentors/:id
    const mentor = await api.put(`/api/mentors/${id}`, req.body);
    return res.json(mentor.data);

  } catch (error) {
    // Cek koneksi dari api service-course
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: ' service unavailable' });
    }

    // Return jika ada error lain
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}