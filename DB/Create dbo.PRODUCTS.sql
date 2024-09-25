USE [OneFilePMS]
GO

/****** Object: Table [dbo].[PRODUCTS] Script Date: 25/09/2024 18:03:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PRODUCTS] (
    [ProductId]   INT            IDENTITY(1,1) PRIMARY KEY,
    [ProductName] NVARCHAR (100) NOT NULL,
    [Price]       DECIMAL (18)   NOT NULL,
    [Quantity]    INT            NOT NULL
);


