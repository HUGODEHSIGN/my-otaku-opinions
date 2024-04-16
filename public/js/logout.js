const logout = async () => {
  const response = await fetch('TODO:', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
