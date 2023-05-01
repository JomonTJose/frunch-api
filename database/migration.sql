-- DROP SCHEMA "Restaurant";

CREATE SCHEMA "Restaurant" AUTHORIZATION vvyswtkj;


CREATE TABLE "Restaurant".users (
	id serial4 NOT NULL,
	username varchar(100) NOT NULL,
	email varchar(200) NOT NULL,
	created_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE "Restaurant".Cuisine (
	id serial4 NOT NULL,
	cuisine_name varchar(100) NOT NULL,
	description varchar(300) NULL,
	CONSTRAINT cuisine_category_pkey PRIMARY KEY (id)
);

CREATE TABLE "Restaurant".restaurants (
	id serial4 NOT NULL,
	restaurant_name varchar(200) NOT NULL,
	address varchar(300) NOT NULL,
	cuisine_id int4 NOT NULL,
	res_image varchar(200) NULL,
	CONSTRAINT restaurants_pkey PRIMARY KEY (id),
	CONSTRAINT fk_restaurants_cuisine FOREIGN KEY (cuisine_id) REFERENCES "Restaurant".Cuisine(id)
);

CREATE TABLE  "Restaurant".restaurant_reviews (
	id serial4 NOT NULL,
	review varchar(500) NULL,
	user_id int8 NOT NULL,
	rating int4 NOT NULL,
	restuarant_id int8 NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT reviews_pkey PRIMARY KEY (id),
	CONSTRAINT fk_reviews_restaurant FOREIGN KEY (restuarant_id) REFERENCES  "Restaurant".restaurants(id)
);

-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE "Restaurant".products (
	id serial4 NOT NULL,
	product_name varchar(100) NOT NULL,
	cuisine_id int4 NOT NULL,
	restaurant_id int4 NOT NULL,
	price numeric NULL,
	product_image_url varchar(200) NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT fk_products_cuisine FOREIGN KEY (cuisine_id) REFERENCES "Restaurant".Cuisine(id),
	CONSTRAINT fk_products_restaurants FOREIGN KEY (restaurant_id) REFERENCES "Restaurant".restaurants(id)
);

-- public.product_reviews definition

-- Drop table

-- DROP TABLE public.product_reviews;

CREATE TABLE "Restaurant".product_reviews (
	id serial4 NOT NULL,
	review varchar(500) NULL,
	user_id int8 NOT NULL,
	rating int4 NOT NULL,
	product_id int8 NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT product_reviews_pkey PRIMARY KEY (id),
	CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES "Restaurant".products(id)
);

-- public."RestaurantsListwithRatingsView" source

CREATE OR REPLACE VIEW "RestaurantsListwithRatingsView"
AS SELECT re.restaurant_name,
    re.id,
    cc.cuisine_name,
    re.address,
    avg(reviews.rating) AS average_rating,
    reviews.review,
    re.res_image
   FROM restaurants re
     LEFT JOIN ( SELECT rr.restuarant_id,
            rr.rating,
            rr.created_at,
            rr.review
           FROM restaurant_reviews rr
          WHERE rr.created_at = (( SELECT max(rr2.created_at) AS max
                   FROM restaurant_reviews rr2
                  WHERE rr2.restuarant_id = rr.restuarant_id))) reviews ON re.id = reviews.restuarant_id
     LEFT JOIN cuisine cc ON cc.id = re.cuisine_id
  WHERE cc.id = re.cuisine_id
  GROUP BY re.id, reviews.review, re.restaurant_name, re.cuisine_id, cc.cuisine_name;

 
 CREATE OR REPLACE PROCEDURE "Restaurant".getallratedrestaurantsbyuserid(IN userid integer)
 LANGUAGE plpgsql
AS $procedure$
begin
	select restaurants.id ,res_image , restaurants.restaurant_name , rr.rating, users.username , users.email 
	FROM restaurants
	INNER JOIN restaurant_reviews rr ON restaurants.id = rr.restuarant_id 
	INNER JOIN users ON rr.user_id  = users.id 
	WHERE rr.user_id =userId;
end;$procedure$
;

CREATE OR REPLACE PROCEDURE "Restaurant".saverestaurantratings(IN review_comments character varying, IN user_id integer, IN rating integer, IN restaurantid integer)
 LANGUAGE sql
AS $procedure$
	insert into restaurant_reviews 
	(review, user_id, rating, restuarant_id, created_at)
	values (review_comments , user_id , rating , restaurantid , current_timestamp) returning id;
	select max(id) from restaurant_reviews
$procedure$
;

