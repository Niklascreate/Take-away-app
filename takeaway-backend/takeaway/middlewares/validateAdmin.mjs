export const validateAdmin = () => ({
  before: (handler) => {
    const user = handler.event.user;

    if (!user || user.isAdmin !== 'admin') {
      throw new Error('obehörig: Admin only');
    }    

    return handler;
  }
});