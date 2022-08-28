import Users from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    // validasi
    if (!refreshToken) return res.sendStatus(401);
    // kalo dapet tokennya bandingkan token ini dengan token yag ada di database
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    // kalo ga cocok token yg didapat dari db dan client
    if (!user[0]) return res.sendStatus(403);
    // kalo cocok tokennya verif
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      //   jika tidak terdapat error maka ambil value yang terdapat dari user
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      //   buat akses token baru
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
      });
      //   kirim respon akes ke klien
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
