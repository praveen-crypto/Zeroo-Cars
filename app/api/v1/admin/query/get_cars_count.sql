SELECT available.available_count,archive.archive_count,sold.sold_count
FROM (SELECT COUNT(*) available_count
      FROM basic
      WHERE viewable = TRUE
      AND   sold = FALSE) AS available,
     (SELECT COUNT(*) archive_count
      FROM basic
      WHERE viewable = FALSE
      AND   sold = FALSE) archive,
     (SELECT COUNT(*) sold_count FROM basic WHERE sold = TRUE) sold;
