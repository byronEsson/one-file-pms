﻿CREATE PROCEDURE SP_SELECT_PRODUCT_BYID @PRODUCT_ID INT

AS

SELECT * FROM PRODUCTS WHERE ProductId = @PRODUCT_ID

GO