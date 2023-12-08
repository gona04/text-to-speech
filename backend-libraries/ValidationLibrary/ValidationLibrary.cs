namespace Validations

{
    public static class ValidationLibrary
    {
        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }

        // Add additional validations here

        public static bool IsInvalidId<T>(long id)
        {
            // Example of using generic type T
            // You can perform validation specific to the type T
            // For now, just check if the ID is <= 0
            return id <= 0;
        }

        public static bool IsInvalidIdMismatch<T>(long id, T item)
        {
            // Example of using generic type T
            // You can perform validation specific to the type T
            // For now, just check if the ID does not match the item's ID
            if (item is IHasId hasIdItem)
            {
                return id != hasIdItem.Id;
            }

            // Handle the case where the type T does not have an ID
            return false;
        }

        public static bool IsTextEmpty(string text)
        {
            return text.IsNullOrEmpty();
        }
    }

    // Example of an interface for types that have an ID
    public interface IHasId
    {
        long Id { get; }
    }
}

