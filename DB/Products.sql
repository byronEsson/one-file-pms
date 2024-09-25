CREATE TABLE [dbo].[PRODUCTS]
(
	[ProductId] INT NOT NULL PRIMARY KEY, 
    [ProductName] NVARCHAR(100) NOT NULL, 
    [Price] DECIMAL NOT NULL, 
    [Quantity] INT NOT NULL
)
