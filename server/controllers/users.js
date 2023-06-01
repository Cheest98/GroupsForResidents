import User from "../models/user.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('group');
    
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }

    const { group } = user;
    let groupInfo = null;

    if (group) {
      groupInfo = group;
    }

    res.status(200).json({ user, group: groupInfo });
    //console.log({ user, group: groupInfo })
  } catch (err) {
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
};

/* UPDATE */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Znajdź użytkownika w bazie danych i zaktualizuj jego dane
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true } // Zwraca zaktualizowany obiekt użytkownika
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
};