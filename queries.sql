-- 1. Posta kodu 1010 olan tüm müşteriler
SELECT * FROM Customers WHERE PostalCode = '1010';

-- 2. id'si 11 olan tedarikçinin telefon numarası
SELECT Phone FROM Suppliers WHERE SupplierID = 11;

-- 3. İlk 10 sipariş (Tarihe göre azalan)
SELECT TOP 10 * FROM Orders ORDER BY OrderDate DESC;

-- 4. Londra, Madrid veya Brezilya'daki müşteriler
SELECT * FROM Customers WHERE City IN ('London', 'Madrid') OR Country = 'Brazil';

-- 5. Yeni kayıt ekleme
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', 'Bag End', '1 Hobbit-Hole', '111', 'Orta Dünya');

-- 6. Bilbo Baggins güncelleme
UPDATE Customers SET PostalCode = '11122' WHERE ContactName = 'Bilbo Baggins';

-- ZORLAYICI GÖREVLER --
-- Farklı şehirlerin sayısı (69)
SELECT COUNT(DISTINCT City) FROM Customers;

-- 20 karakterden uzun adları olan tedarikçiler (11)
SELECT * FROM Suppliers WHERE LEN(SupplierName) > 20;