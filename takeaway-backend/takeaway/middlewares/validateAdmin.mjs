export const validateAdmin = () => ({
  before: (handler) => {
    const user = handler.event.user;

    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Admin only');
    }

    return handler;
  }
});