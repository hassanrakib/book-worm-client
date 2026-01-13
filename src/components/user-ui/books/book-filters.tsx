"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
  VStack,
  Box,
  Text,
  SimpleGrid,
  Input,
  createListCollection,
  Slider,
  HStack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";

const sortOptions = createListCollection({
  items: [
    { label: "Top Rated", value: "-avgRating" },
    { label: "Least Rated", value: "avgRating" },
    { label: "Most Shelved", value: "-shelfCount" },
    { label: "Least Shelved", value: "shelfCount" },
  ],
});

const BookFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { data: categoriesResponse } = useGetCategoriesQuery(undefined);

  const categories = createListCollection({
    items:
      categoriesResponse?.data?.map((c) => ({ label: c.name, value: c._id })) ||
      [],
  });

  // --- 1. State Initialized from URL ---
  const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
  const [debouncedSearch] = useDebounce(search, 500);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  );

  const [ratingRange, setRatingRange] = useState<number[]>([
    Number(searchParams.get("minRating")) || 0,
    Number(searchParams.get("maxRating")) || 5,
  ]);

  const [sortBy, setSortBy] = useState<string[]>([
    searchParams.get("sort") || "-avgRating",
  ]);

  // --- 2. Update URL when states change ---
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) params.set("searchTerm", debouncedSearch);
    else params.delete("searchTerm");

    if (selectedCategories.length > 0)
      params.set("category", selectedCategories.join(","));
    else params.delete("category");

    params.set("minRating", ratingRange[0].toString());
    params.set("maxRating", ratingRange[1].toString());
    params.set("sort", sortBy[0]);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [
    debouncedSearch,
    selectedCategories,
    ratingRange,
    sortBy,
    pathname,
    router,
  ]);

  return (
    <VStack
      align="stretch"
      gap="5"
      p="5"
      borderWidth="1px"
      rounded="2xl"
      bg="white"
      opacity={isPending ? 0.6 : 1}
      transition="opacity 0.2s"
    >
      <Box>
        <Text fontSize="xs" fontWeight="bold" mb="1.5" color="fg.muted">
          SEARCH
        </Text>
        <InputGroup width="full" startElement={<LuSearch />}>
          <Input
            placeholder="Title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="subtle"
            borderRadius="xl"
          />
        </InputGroup>
      </Box>

      <SimpleGrid columns={1} gap="4">
        <Box>
          <Text fontSize="xs" fontWeight="bold" mb="1.5" color="fg.muted">
            CATEGORIES
          </Text>
          <SelectRoot
            multiple
            collection={categories}
            size="sm"
            value={selectedCategories}
            onValueChange={(e) => setSelectedCategories(e.value)}
          >
            <SelectTrigger clearable>
              <SelectValueText placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.items.map((cat) => (
                <SelectItem item={cat} key={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>

        <Box px="2" pb="2">
          <HStack justify="space-between" mb="2">
            <Text fontSize="xs" fontWeight="bold" color="fg.muted">
              RATING RANGE
            </Text>
            <Text fontSize="xs" fontWeight="bold">
              {ratingRange[0]} - {ratingRange[1]} ★
            </Text>
          </HStack>
          <Slider.Root
            min={0}
            max={5}
            step={0.5}
            value={ratingRange}
            onValueChange={(e) => setRatingRange(e.value)}
          >
            <Slider.Control>
              <Slider.Track bg="gray.100">
                <Slider.Range bg="yellow.400" />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="bold" mb="1.5" color="fg.muted">
            SORT BY
          </Text>
          <SelectRoot
            collection={sortOptions}
            size="sm"
            value={sortBy}
            onValueChange={(e) => setSortBy(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.items.map((opt) => (
                <SelectItem item={opt} key={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default BookFilters;
