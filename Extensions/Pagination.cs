using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace webshop.Pagination
{

    public class Page<T>
    {
        public int Index { get; set; }
        public T[] Items { get; set; }
        public int TotalPages { get; set; }
    }

    public static class MyExtension
    {
           public static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query, string[] relationsToInclude) where T : class
            {
                if (relationsToInclude == null || relationsToInclude.Length == 0)
                {
                    return query;   
                }

                foreach (var pathToRelation in relationsToInclude)
                    query = query.Include(pathToRelation);
                    
                return query;
            }

        public static Page<T> GetPages<T>(this Microsoft.EntityFrameworkCore.DbSet<T> list, int index_page, int page_size, Func<T, object> order_by_selector, params string[] relationsToInclude) where T : class
        {
            var result = list.IncludeMultiple(relationsToInclude).OrderBy(order_by_selector)
                            .Skip(index_page * page_size)
                            .Take(page_size)
                            .ToArray();
            
            var tot_items = list.Count();
            var tot_pages = tot_items / page_size;

            return new Page<T>
            {
                Index = index_page,
                Items = result,
                TotalPages = tot_pages
            };
        }
    }
}