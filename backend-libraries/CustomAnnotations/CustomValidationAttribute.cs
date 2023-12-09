using System;
using System.ComponentModel.DataAnnotations;

namespace CustomAnnotations
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CustomValidationAttribute : ValidationAttribute
    {
        private readonly int _maxLength;
        private readonly bool _isRequired;
        private readonly DataType _dataType;

        public CustomValidationAttribute(int maxLength, bool isRequired, DataType dataType)
        {
            _maxLength = maxLength;
            _isRequired = isRequired;
            _dataType = dataType;
            
            ErrorMessage = $"The field cannot exceed {_maxLength} characters.";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // Custom validation logic
            if (_isRequired && (value == null || string.IsNullOrWhiteSpace(value.ToString())))
            {
                return new ValidationResult("This field is required.");
            }

            if (value is string str && str.Length > _maxLength)
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
